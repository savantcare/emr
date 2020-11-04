<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class ServiceStatement extends Model
{
    protected $connection = 'serviceStatementDB';
    protected $table = 'service_statements';
    public $timestamps = false;
    protected $primaryKey = 'serverSideRowUuid';
    protected $keyType = 'string';
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'patientUuid', 'total_minutes_in_psychotherapy_select','total_minutes_with_patient_select','modality_of_psychotherapy_multi_select', 'recordChangedByUuid',
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
