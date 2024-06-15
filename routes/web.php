<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\TestsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::resource('todos', TodoController::class);
Route::resource('tests', TestsController::class);
Route::post('/tests/{id}/submit', [TestsController::class, 'submit']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/routes/about', function () {
        return Inertia::render('routes/About');
    })->name('routes/about');
    
    Route::get('/routes/information', function () {
        return Inertia::render('routes/Information');
    })->name('routes/information');

    Route::get('/routes/calculator', function () {
        return Inertia::render('routes/Calculator');
    })->name('routes/calculator');

    Route::get('/routes/todo', function () {
        return Inertia::render('routes/Todo');
    })->name('routes/todo');

    Route::get('/routes/ticTacToe', function () {
        return Inertia::render('routes/TicTacToe');
    })->name('routes/ticTacToe');

    Route::get('/routes/createTest', function () {
        return Inertia::render('routes/CreateTest');
    })->name('routes/createTest');

    Route::post('/routes/createTest', [TestsController::class, 'store'])->name('tests.store');

     Route::get('/routes/testList', function () {
        return Inertia::render('routes/TestList');
    })->name('routes/testList');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
