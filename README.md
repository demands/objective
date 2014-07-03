# WIP test double framework for building up mock objects

Things that should exist:

- clean, easy, obvious syntax
  (see https://gist.github.com/justinabrahms/81645db1b0262aa36b9b)

Ability to:

- build up a simple mock object
- overwrite parameters
  - even nested ones, even with arrays
- have the mock object have a certain prototype (maybe even run a scontructor function?)
- automatically have that mock object be persisted in the database
- make use of other factories in your factory
- async parameters, and the ability to conditionally use them (if you want your object to be instanciated synchronously)
- options that your object creation function can use to do what they do

[![build status](https://secure.travis-ci.org//objective.png)](http://travis-ci.org//objective)

## Installation

```
npm install objective --save
```

## Usage

## Credits
[](https://github.com//)
