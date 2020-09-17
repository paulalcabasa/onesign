<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Repositories\UserRepositoryInterface;

class FrontendController extends Controller
{
    // For admin application
    public function admin()
    {
        return view('admin');
    }
    // For public application
    public function app()
    {
        return view('app');
    }

    
    public function test(UserRepositoryInterface $repo)
    {
       return $repo->findById(1);
        return 'test';
        // return $credentials;
        // if (! $token = auth()->attempt($credentials)) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }

        // return $this->respondWithToken($token);
    }


  
}