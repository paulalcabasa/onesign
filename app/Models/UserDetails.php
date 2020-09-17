<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserDetails extends Model
{
    protected $connection = "ipc_central";
    protected $table = "ipc_central.personal_information_tab";
    protected $primaryKey = "id";

   
}
