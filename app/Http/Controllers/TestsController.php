<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Models\Question;
use Inertia\Inertia;
use App\Models\Answer;
use Illuminate\Http\Request;

class TestsController extends Controller
{

    public function index()
    {
        $tests = Test::with('user')->get();
        return response()->json($tests);
    }

    public function show($id)
    {
        $test = Test::with('questions.answers')->findOrFail($id);
        return response()->json($test);
    }

    public function store(Request $request)
    {
        $request->validate([
            'test' => 'required|string|max:255',
            'questions' => 'required|array',
            'questions.*.question' => 'required|string|max:255',
            'questions.*.answers' => 'required|array',
            'questions.*.answers.*.answer' => 'required|string|max:255',
            'questions.*.answers.*.isCorrect' => 'required|boolean',
        ]);

        $test = Test::create([
            'test' => $request->test,
            'user_id' => auth()->id(),
        ]);

        foreach ($request->questions as $questionData) {
            $question = $test->questions()->create([
                'question' => $questionData['question'],
            ]);

            foreach ($questionData['answers'] as $answerData) {
                $question->answers()->create([
                    'answer' => $answerData['answer'],
                    'is_correct' => $answerData['isCorrect'],
                ]);
            }
        }

        return response()->json(['message' => 'Test created Successfully']);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'test' => 'required|string|max:255',
            'questions' => 'required|array',
            'questions.*.question' => 'required|string|max:255',
            'questions.*.answers' => 'required|array',
            'questions.*.answers.*.answer' => 'required|string|max:255',
            'questions.*.answers.*.isCorrect' => 'required|boolean',
        ]);

        $test = Test::findOrFail($id);
        $test->update([
            'test' => $request->test,
        ]);

        $test->questions()->delete();
        foreach ($request->questions as $questionData) {
            $question = $test->questions()->create([
                'question' => $questionData['question'],
            ]);

            foreach ($questionData['answers'] as $answerData) {
                $question->answers()->create([
                    'answer' => $answerData['answer'],
                    'is_correct' => $answerData['isCorrect'],
                ]);
            }
        }

        return response()->json(['message' => 'Test updated successfully']);
    }

    public function submit(Request $request, $id)
    {
        $request->validate([
            'selectedAnswers' => 'required|array',
        ]);

        $selectedAnswers = $request->input('selectedAnswers');
        $test = Test::with('questions.answers')->findOrFail($id);

        $correctCount = 0;
        $totalCount = $test->questions->count();

        foreach ($test->questions as $question) {
            $correctAnswer = $question->answers->firstWhere('is_correct', true);

            if ($correctAnswer && isset($selectedAnswers[$question->id]) && $selectedAnswers[$question->id] == $correctAnswer->id) {
                $correctCount++;
            }
        }

        $score = $totalCount > 0 ? ($correctCount / $totalCount) * 100 : 0;

        return response()->json(['score' => $score]);
    }


    public function destroy($id)
    {
        $test = Test::findOrFail($id);
        $test->delete();
        return response()->json(['message' => 'Test deleted successfully']);
    }
}
