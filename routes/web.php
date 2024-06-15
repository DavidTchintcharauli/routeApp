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
Route::get('/tests', [TestsController::class, 'index']);
Route::delete('/tests/{id}', [TestsController::class, 'destroy']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    $routes = [
        'about' => 'About',
        'information' => 'Information',
        'calculator' => 'Calculator',
        'todo' => 'Todo',
        'ticTacToe' => 'TicTacToe',
        'createTest' => 'CreateTest',
        'testList' => 'TestList'
    ];

    foreach ($routes as $route => $component) {
        Route::get("/routes/{$route}", function () use ($component) {
            return Inertia::render("routes/{$component}");
        })->name("routes/{$route}");
    }

    Route::post('/routes/createTest', [TestsController::class, 'store'])->name('tests.store');
});
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
