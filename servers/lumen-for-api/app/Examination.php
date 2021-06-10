<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class Examination extends Model
{
    protected $connection = 'examinationDB';
    protected $table = 'examination';
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
        'ptUuid', 'recordChangedByUuid','appearance_multi_select','cognition_multi_select','attitude_multi_select','eye_contact_multi_select','impulse_control_multi_select','insight_multi_select','judgement_multi_select','mood_affect_multi_select','neurological_multi_select','perceptions_multi_select','psychomotor_multi_select','recordChangedFromIPAddress',
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
