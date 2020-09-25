<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;


class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    protected $connection = "ipc_central";
    protected $table = "ipc_central.users_v";
    protected $primaryKey = "employee_id";

    protected $fillable = ['employee_id', 'employee_no', 'first_name', 'middle_name', 'last_name'];
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

    public function info()
    {
        return $this->belongsTo('App\Models\UserDetail', 'id', 'employee_id')->select(array('employee_id','first_name', 'middle_name', 'last_name'));
    }

    

}