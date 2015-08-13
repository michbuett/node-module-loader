describe('WebLoader', function () {
    'use strict';

    it('can require potions', function () {
        expect(require('./tests/potions/PotionA').getName()).toBe(
            'Potion A (extended B) (extended A)'
        );

        expect(require('./tests/potions/PotionA').getOtherName()).toBe(
            'Potion A (other name)'
        );

        expect(require('./tests/potions/PotionB').getName()).toBe(
            'Potion B (extended B)'
        );
    });
});

