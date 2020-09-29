<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\UserRepository;
use App\Repositories\UserRepositoryInterface;
use App\Repositories\ApprovalApiRepository;
use App\Repositories\ApprovalApiRepositoryInterface;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
        
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
        
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(ApprovalApiRepositoryInterface::class, ApprovalApiRepository::class);
    }
}
