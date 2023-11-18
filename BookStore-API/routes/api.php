<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LoginGoogleController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Auth::routes();


Route::middleware('auth:api')->group(function () {

  Route::prefix('roles')->controller(RoleController::class)->name('roles.')->group(function () {
    Route::get('/', 'index')->name('index')->middleware('role:super-admin');
    Route::post('/', 'store')->name('store')->middleware('role:super-admin');
    Route::get('/create', 'create')->name('create')->middleware('role:super-admin');
    Route::get('/{role}', 'show')->name('show')->middleware('role:super-admin');
    Route::put('/{role}', 'update')->name('update')->middleware('role:super-admin');
    Route::delete('/{role}', 'destroy')->name('destroy')->middleware('role:super-admin');
    Route::get('/{role}/edit', 'edit')->name('edit')->middleware('role:super-admin');
  });
  Route::prefix('users')->controller(UserController::class)->name('users.')->group(function () {
    Route::get('/', 'index')->name('index')->middleware('permission: show-user');
    Route::post('/', 'store')->name('store')->middleware('permission: create-user');
    Route::get('/create', 'create')->name('create')->middleware('permission: create-user');
    Route::get('/{user}', 'show')->name('show')->middleware('permission: show-user');
    Route::put('/{user}', 'update')->name('update')->middleware('permission: update-user');
    Route::delete('/{user}', 'destroy')->name('destroy')->middleware('permission: delete-user');
    Route::get('/{user}/edit', 'edit')->name('edit')->middleware('permission: update-user');
  });
  Route::prefix('categories')->controller(CategoryController::class)->name('categories.')->group(function () {
    Route::get('/', 'index')->name('index')->middleware('permission: show-category');
    Route::post('/', 'store')->name('store')->middleware('permission: create-category');
    Route::get('/create', 'create')->name('create')->middleware('permission: create-category');
    Route::get('/{category}', 'show')->name('show')->middleware('permission: show-category');
    Route::put('/{category}', 'update')->name('update')->middleware('permission: update-category');
    Route::delete('/{category}', 'destroy')->name('destroy')->middleware('permission: delete-category');
    Route::get('/{category}/edit', 'edit')->name('edit')->middleware('permission: update-category');
  });
  Route::prefix('brands')->controller(BrandController::class)->name('brands.')->group(function () {
    Route::get('/', 'index')->name('index')->middleware('permission: show-brand');
    Route::post('/', 'store')->name('store')->middleware('permission: create-brand');
    Route::get('/create', 'create')->name('create')->middleware('permission: create-brand');
    Route::get('/{brand}', 'show')->name('show')->middleware('permission: show-brand');
    Route::put('/{brand}', 'update')->name('update')->middleware('permission: update-brand');
    Route::delete('/{brand}', 'destroy')->name('destroy')->middleware('permission: delete-brand');
    Route::get('/{brand}/edit', 'edit')->name('edit')->middleware('permission: update-brand');
  });
  Route::prefix('products')->controller(ProductController::class)->name('products.')->group(function () {
    Route::get('/', 'index')->name('index')->middleware('permission: show-product');
    Route::post('/', 'store')->name('store')->middleware('permission: create-product');
    Route::get('/create', 'create')->name('create')->middleware('permission: create-product');
    Route::get('/{product}', 'show')->name('show')->middleware('permission: show-product');
    Route::put('/{product}', 'update')->name('update')->middleware('permission: update-product');
    Route::delete('/{product}', 'destroy')->name('destroy')->middleware('permission: delete-product');
    Route::get('/{product}/edit', 'edit')->name('edit')->middleware('permission: update-product');
  });
  Route::get('/cart-client/{userid}', [CartController::class, 'index']);
  Route::post('/addtocart', [CartController::class, 'store']);
  Route::delete('/delete-cart/{cart}', [CartController::class, 'destroy']);
  Route::put('/update-cart/{cart}', [CartController::class, 'update']);
  Route::delete('/delete-cart-user/{user_id}', [CartController::class, 'deleteCart']);
  Route::post('/place-order', [CartController::class, 'storeOrder']);
  Route::get('/list-order/{user}', [OrderController::class, 'index']);
  Route::get('/list-cart-order/{order_id}', [OrderController::class, 'orderDetail']);
  Route::post('/comments', [CommentController::class, 'store']);
});
Route::get('/comments/{productId}', [CommentController::class, 'index']);
Route::get('product', [ProductController::class, 'index']);
Route::get('product/{product}', [ProductController::class, 'show']);
Route::get('cart', [CartController::class, 'index']);
Route::post('login/google', [LoginGoogleController::class, 'login']);
