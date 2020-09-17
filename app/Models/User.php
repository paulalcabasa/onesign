<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;


class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    protected $connection = "ipc_central";
    protected $table = "ipc_central.employee_masterfile_tab";
    protected $primaryKey = "id";

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    

    // public function authenticate($credentials)
    // {
       
    //     $sql = "SELECT emt.id employee_id,
    //                 info.first_name,
    //                 info.middle_name,
    //                 info.last_name,
    //                 emt.employee_no
    //             FROM ipc_central.employee_masterfile_tab emt
    //                 LEFT JOIN ipc_central.password_tab pwd
    //                     ON pwd.employee_id = emt.id
    //                 LEFT JOIN ipc_central.personal_information_tab info
    //                     ON info.employee_id = emt.id
    //             WHERE emt.employee_no = :username
    //                 AND pwd.password = :password
    //                 AND emt.status_id IN (1,2,3,4)";
    //     $query = DB::connection('ipc_central')->select($sql, [
    //         'username' => $credentials['username'], 
    //         'password' => $credentials['password']
    //     ]);
    //     return $query;
    // }

}