const assert = require('chai').assert;
const { RdapData } = require('../src/libraries/RdapData');

describe('RdapData', function() {

  describe('#buildResponse()', function() {
    it('should return a correct RdapResponse object when rdapResponse exists', function() {
      const rdapResponseObject = {
        events: [{
          eventAction: 'xpir',
          eventDate: '2023-05-28'
        }],
        nameservers: [{
          ldhName: 'ns1.test.com'
        }],
        links: [{
          rel: 'self',
          href: 'http://rdap.test.com'
        }],
        entities: [
          {
            roles: ['administrative'],
            handle: 'admin'
          },
          {
            roles: ['technical'],
            handle: 'tech'
          }
        ]
      }

      const rdapData = new RdapData(rdapResponseObject);
      const response = rdapData.buildResponse();

      assert.equal(response.origin, 'rdap');
      assert.equal(response.domainExpirationDate.toISOString().split('T')[0], '2023-05-28');
      assert.equal(response.registrar.name, 'test.com');
      assert.equal(response.registrar.url, 'http://test.com');
      assert.equal(response.registrar.owner, 'admin');
      assert.equal(response.registrar.tech, 'tech');
      assert.equal(response.provider, 'test.com');
      assert.deepEqual(response.nameServers, ['ns1.test.com']);
    });

    it('should return an empty RdapResponse object when rdapResponse does not exist', function() {
      const rdapData = new RdapData();
      const response = rdapData.buildResponse();
      assert.equal(response.origin, 'rdap');
      assert.equal(response.domainExpirationDate, null);
      assert.equal(response.registrar.name, null);
      assert.equal(response.registrar.url, null);
      assert.equal(response.registrar.owner, null);
      assert.equal(response.registrar.tech, null);
      assert.equal(response.provider, null);
      assert.equal(response.nameServers, null);
    });
  });
});
