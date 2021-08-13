import { success, notice, error, info, defaults } from '@pnotify/core';

function noticeIncorrect() {
  notice({
    title: 'Warning',
    text: 'Enter correct value',
  });
}

function noticeError() {
  error({
    title: 'Error',
    text: 'Too many matches found. Please enter a more specific query',
  });
}

function noticeProgress() {
  info({
    title: 'Information',
    text: 'Please, keep searching...',
  });
}

function noticeSuccess() {
  success({
    title: 'Success',
    text: 'The search proceeded successfully',
  });
}

function setDefaultsDelay(delay) {
  defaults.delay = delay;
}

export { noticeError, noticeIncorrect, noticeProgress, noticeSuccess, setDefaultsDelay };
