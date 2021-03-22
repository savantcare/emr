<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class MedicationOrder extends Model
{
    protected $connection = 'medicationOrderDB';
    protected $table = 'medication_order';
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
        'ptUuid', 'drugName', 'directionsForPatient', 'startDate', 'qty', 'daysSupply', 'numberOfRefill', 'dispenseAsWritten', 'notesToPharmacist', 'orderingProvider', 'pharmacy', 'notes', 'recordChangedByUuid', 'recordChangedFromIPAddress', 'recordChangedFromSection'
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