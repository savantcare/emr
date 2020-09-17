# STORE

## Q1) What folders are used to make vuex-orm work?

1. [models](../models/)
2. [database](../database/)
3. [store](../store/)
4. [data](../data/)

#### The sequence is:

Step 1: Make the models

Step 2: Register them to database

Step 3: Register the DB to the store.

Step 4: Import the models where you want to use them.

## Q2) What is the pattern being followed for vuex-orm?

This file is structured based on:
[https://github.com/vuex-orm/vuex-orm-examples-nuxt/](https://github.com/vuex-orm/vuex-orm-examples-nuxt/)

## Q3 What is this folder used for?

This directory contains your Vuex Store files.
Vuex Store option is implemented in the Nuxt.js framework.

Creating a file in this directory automatically activates the option in the framework.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/vuex-store).

## Q) Why is database needed?

This registers the models to vuex store.

## Q) Where is the data stored inside vuex?

entities inside vuex store.

## Q) Where is the official docs?

[https://vuex-orm.org/guide/model/database-registration.html](https://vuex-orm.org/guide/model/database-registration.html)

## Q) What is this file structure based on?

https://github.com/vuex-orm/vuex-orm-examples-nuxt/tree/master/database
