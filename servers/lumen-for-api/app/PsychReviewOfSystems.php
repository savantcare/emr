<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class PsychReviewOfSystems extends Model
{
    protected $connection = 'psychReviewOfSystemsDB';
    protected $table = 'psych_review_of_systems';
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
        'ptUuid', 'subjective', 'depressive_mood', 'depressive_interest', 'depressive_sleep', 'depressive_esteem', 'depressive_energy', 'depressive_conc', 'depressive_appetite', 'depressive_retardation', 'depressive_suicidal', 'gateway_depressed', 'gateway_energetic', 'gateway_interest', 'gateway_mood', 'gateway_irritable', 'gateway_difficult', 'mania_mood', 'mania_irritable', 'mania_energy', 'mania_sleep', 'mania_talking', 'mania_racing', 'mania_distractability', 'mania_risk', 'obese', 'thinCachectic', 'disheveledUnkempt', 'malodorous', 'recordChangedByUuid',
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