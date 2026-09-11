// ============================================================
// Enquiry topic hand-off
// ============================================================
// Each service pillar used to end with a button that left the page for a
// different form, so the visitor arrived at a blank textarea and had to
// re-explain what they had just clicked on — and the enquiry that landed in the
// inbox carried no hint of which service prompted it.
//
// The pillar buttons now point at the form already on the page and announce
// their topic, which the form uses to prefill the message and to label the
// email. A custom event keeps this out of the URL, so the page stays static.

export const ENQUIRY_TOPIC_EVENT = 'wynwin:enquiry-topic';

/** Announce which service an enquiry is about, just before jumping to the form. */
export function setEnquiryTopic(topic: string) {
  window.dispatchEvent(new CustomEvent(ENQUIRY_TOPIC_EVENT, { detail: topic }));
}
