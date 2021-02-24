<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class MedicalReviewOfSystem extends Model
{
    protected $connection = 'medicalReviewOfSystemDB';
    protected $table = 'medical_review_of_system';
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
        'ptUuid', 'constitutional_systems_select', 'skin_conditions_select', 'allergies_select', 'ear_nose_mouth_throat_select', 'eyes_head_select', 'respiratory_select', 'cardiovascular_select', 'gastrointestinal_select', 'urinary_select', 'endocrine_select', 'musculoskeletal_select', 'neurological_select', 'psychological_select', 'heme_lymphatic_select', 'any_other_signs_symptoms', 'recordChangedByUuid', 'recordChangedFromIPAddress'
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
