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
		it('should accept tags without values as a bool', function(){
			var args = ['--searchContents'];
			var result = tags.parse(args);

			expect(result).to.have.a.property('searchContents', true);
		})
		it('should accept short formed tags', function(){
			var args = ['-sd=4', '-h'];
			var replacement = {
				s: "searchContents",
				d: "depth",
				h: "hello"
			}
			var result = tags.parse(args, {}, replacement);

			var expected = {
				searchContents: true,
				depth: 4,
				hello: true
			}

			expect(result).to.deep.equal(expected);
		})
	})

})
