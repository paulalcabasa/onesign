<?php 

namespace App\Repositories;

interface UserRepositoryInterface
{
    public function findById($userId);

    public function authenticate($credentials);
}