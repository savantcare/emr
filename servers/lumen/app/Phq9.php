<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class Phq9 extends Model
{
    protected $table = 'phq9PtResponses';
    public $timestamps = false;
    protected $primaryKey = 'ptUUID';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $connection = 'screeningDB';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'ptUUID', 'question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'recordChangedByUUID', 'recordChangedFromIPAddress'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    protected static function boot()
    {
        parent::boot();

        static::creating(function (Model $model) {
            $model->setAttribute($model->getKeyName(), Uuid::uuid4());
        });
    }
}