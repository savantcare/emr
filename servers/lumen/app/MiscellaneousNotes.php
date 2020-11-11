<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class MiscellaneousNotes extends Model
{
    protected $connection = 'miscellaneousNotesDB';
    protected $table = 'miscellaneous_notes';
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
        'ptUuid', 'recordChangedByUuid',
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
