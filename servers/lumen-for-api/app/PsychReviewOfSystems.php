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
        'ptUuid', 'subjective', 'gateway_depressed', 'gateway_energetic', 'gateway_interest', 'gateway_mood', 'gateway_irritable', 'gateway_difficult', 'depressive_mood', 'depressive_interest', 'depressive_sleep', 'depressive_esteem', 'depressive_energy', 'depressive_conc', 'depressive_appetite', 'depressive_retardation', 'depressive_suicidal', 'depressive_note', 'mania_mood', 'mania_irritable', 'mania_energy', 'mania_sleep', 'mania_talking', 'mania_racing', 'mania_distractibility', 'mania_risk', 'mania_note', 'psychosis_delusions', 'psychosis_hallucinations', 'psychosis_speech', 'psychosis_behavior', 'psychosis_negativeSx', 'psychosis_note', 'sleep_assessment', 'sleep_note', 'substance_list' , 'substance_note', 'gad_anxiety', 'gad_difficult', 'gad_restless', 'gad_fatigued', 'gad_concentrating', 'gad_irritability', 'gad_muscle', 'gad_disturbance', 'gad_note', 'panic_attacks', 'panic_impairment', 'panic_intensity', 'panic_note', 'social_marked_anxiety', 'social_fear_that','social_social_situation', 'social_intense_anxiety', 'social_anxiety_is_out_of_proportion', 'social_anxiety_note', 'ocd_obsessions', 'ocd_compulsions', 'ocd_distressing', 'ocd_insight', 'ocd_note', 'ptsd_re_experiencing', 'ptsd_avoidance', 'ptsd_arousal', 'ptsd_negative', 'ptsd_note', 'adhd_inattention', 'adhd_hyperactivity', 'adhd_careless', 'adhd_problem',   'adhd_poor', 'adhd_fails', 'adhd_difficulty', 'adhd_reluctant', 'adhd_loses', 'adhd_distracted', 'adhd_forgetful', 'adhd_fidgets', 'adhd_leaves', 'adhd_feels', 'adhd_unable', 'adhd_seems', 'adhd_talks', 'adhd_blurts', 'adhd_difficulty_waiting', 'adhd_interrupts', 'adhd_note', 'anorexia_food_restriction', 'anorexia_intense_fear', 'anorexia_body_image', 'anorexia_bmi' , 'anorexia_note', 'bulimia_binge_eating', 'bulimia_compensatory_behaviors', 'bulimia_self_evaluation', 'bulimia_note', 'dementia_note', 'suicide_ideations' , 'suicide_note', 'homicide_ideations' , 'homicide_note', 'recordChangedByUuid',  'recordChangedFromIPAddress'
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
