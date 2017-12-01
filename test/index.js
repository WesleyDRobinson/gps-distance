import test from 'ava'
import {
    calculateDistance,
    parseTxt
} from '../lib/helpers'
import getInvitees from '../lib'

test('getInvitees is a function', async t => {
    t.is(typeof getInvitees, 'function', 'getInvitees should be a function')

    let error = await t.throws(getInvitees())
    t.is(error.message,'could not open file', 'should throw Error when invoked without params')
})

test('parseTxt function should "work" :)', async t => {
    t.plan(3)
    let customers = await parseTxt('./test/test.txt')
    t.is(Array.isArray(customers), true, 'parseTxt() should return an Array')
    t.is(typeof customers[0], 'object', 'the Array should contain objects')
    t.is(typeof customers[0].user_id, 'number', 'the objects should be a user')
})

test('calculateDistance function output type', t => {
    let actual = typeof calculateDistance()
    let expected = 'number'
    t.is(actual, expected, 'calculateDistance() should return a number')
})

test('calculateDistance from HQ', t => {
    let actual = calculateDistance(53.3381985, -6.2592576)
    let expected = 0
    t.is(actual, expected, 'calculateDistance(hqLat, hqLong) should return 0')
})

test('calculateDistance from 53.303351, -7.176197', t => {
    let actual = calculateDistance(53.303351, -7.176197)
    let expected = 61
    t.is(actual, expected, '61 km according to Google Maps measurements')
})
