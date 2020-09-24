<?php

namespace App\Repositories;

use App\Repositories\UserRepositoryInterface;
use App\Models\User;
use App\Models\UserDetail;
use App\Models\UserPassword;
use DB;

class UserRepository implements UserRepositoryInterface
{

    public function findById($userId)
    {
        return $userId;
    }

    public function authenticate($credentials)
    {
      
        $sql = "SELECT emt.id employee_id,
                    info.first_name,
                    info.middle_name,
                    info.last_name,
                    emt.employee_no
                FROM ipc_central.employee_masterfile_tab emt
                    LEFT JOIN ipc_central.password_tab pwd
                        ON pwd.employee_id = emt.id
                    LEFT JOIN ipc_central.personal_information_tab info
                        ON info.employee_id = emt.id
                WHERE emt.employee_no = :username
                    AND pwd.password = :password
                    AND emt.status_id IN (1,2,3,4)";
        $auth = DB::connection('ipc_central')->select($sql, [
            'username' => $credentials['username'], 
            'password' => $credentials['password']
        ]);
  
        return !empty($auth) ? $auth[0] : $auth;
    }
}