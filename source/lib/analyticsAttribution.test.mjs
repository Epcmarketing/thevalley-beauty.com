import assert from 'node:assert/strict';
import { safeCampaign, safeSearchReferrer } from './analyticsAttribution.ts';

assert.equal(safeSearchReferrer('https://www.google.com/search?q=private&email=person@example.com'), 'https://www.google.com/');
assert.equal(safeSearchReferrer('https://www.google.com.my/search?q=private'), 'https://www.google.com.my/');
for (const value of ['', 'invalid', 'https://google.com.evil.example/search', 'https://private.example/customer', 'http://www.google.com/search']) assert.equal(safeSearchReferrer(value), '');

assert.deepEqual(safeCampaign('?utm_source=fb&utm_medium=paid_social&utm_id=123&utm_campaign=123&utm_content=456&utm_term=789&phone=60123456789&email=private@example.com'), {
  campaign_source: 'fb', campaign_medium: 'paid_social', campaign_id: '123',
  campaign_name: '123', campaign_content: '456', campaign_term: '789',
});
assert.deepEqual(safeCampaign('?utm_source=private@example.com&utm_medium=message&utm_campaign=HIFU&utm_content={{ad.id}}&utm_term=Jane'), {});
assert.deepEqual(safeCampaign('?utm_content=123&utm_content=456&utm_source=fb&utm_source=ig'), {});
assert.deepEqual(safeCampaign('?utm_content=12345678901234567890123456&utm_id=-123&utm_campaign=123%20456'), {});
assert.deepEqual(safeCampaign(''), {});
console.log('Safe attribution tests passed');
