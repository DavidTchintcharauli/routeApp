<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Http\Request;

class TestsController extends Controller
{
    public function store(Request $request)
    {
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
}
