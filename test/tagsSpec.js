var expect = require('chai').expect;
var tags = require('../lib/tags');

describe('Tags', function(){
	describe('#parse()', function(){
		it('should have long formed tags', function(){
			var args = ['--depth=4', '--hello=world'];
			var result = tags.parse(args);
			
			expect(result).to.have.a.property('depth', 4);
			expect(result).to.have.a.property('hello', 'world');			
		})
		it('should fallback to defaults', function(){
			var args = ['--depth=4', '--hello=world'];
			var defaults = {depth: 2, foo: 'bar'};
			var result = tags.parse(args, defaults);

			var expected = {
				depth: 4,
				hello: 'world',
				foo: 'bar'
			}

			expect(result).to.deep.equal(expected);
		})

	})

})
