import assert from 'node:assert/strict';
import { safeCampaign } from './analyticsAttribution.ts';

assert.deepEqual(safeCampaign('?utm_source=fb&utm_medium=paid_social&utm_id=123&utm_campaign=123&utm_content=456&utm_term=789&phone=60123456789&email=private@example.com'), {
  campaign_source: 'fb', campaign_medium: 'paid_social', campaign_id: '123',
  campaign_name: '123', campaign_content: '456', campaign_term: '789',
});
assert.deepEqual(safeCampaign('?utm_source=private@example.com&utm_medium=message&utm_campaign=HIFU&utm_content={{ad.id}}&utm_term=Jane'), {});
assert.deepEqual(safeCampaign('?utm_content=123&utm_content=456&utm_source=fb&utm_source=ig'), {});
assert.deepEqual(safeCampaign('?utm_content=12345678901234567890123456&utm_id=-123&utm_campaign=123%20456'), {});
assert.deepEqual(safeCampaign(''), {});
console.log('Safe attribution tests passed');
