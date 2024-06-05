import React from 'react';
import { screen, render } from '@testing-library/react';
import App from './App';

import { 
  onMessage, 
  fetchLikedFormSubmissions, 
  saveLikedFormSubmission, 
  createMockFormSubmission
} from './service/mockServer'; // Import your module

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: key => store[key],
    setItem: (key, value) => { store[key] = value.toString(); },
    clear: () => { store = {}; }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Test case for onMessage function
test('onMessage should add a callback to the callbacks array', () => {
  let callbacks = []
  const callback = jest.fn();
  onMessage(callback);
  createMockFormSubmission();
  expect(callbacks).toContain(callback);
});

// Test case for fetchLikedFormSubmissions function
test('fetchLikedFormSubmissions should return form submissions from localStorage', async () => {
  const submissions = [{ id: 1, data: { name: 'John', liked: true } }];
  localStorage.setItem('formSubmissions', JSON.stringify(submissions));
  const response = await fetchLikedFormSubmissions();
  expect(response.status).toBe(200);
  expect(response.formSubmissions).toEqual(submissions);
});

// Test case for saveLikedFormSubmission function
test('saveLikedFormSubmission should save form submission to localStorage', async () => {
  const formSubmission = { id: 2, data: { name: 'Alice', liked: true } };
  await saveLikedFormSubmission(formSubmission);
  const submissions = JSON.parse(localStorage.getItem('formSubmissions'));
  expect(submissions).toContainEqual(formSubmission);
});

// Test case for createMockFormSubmission function
test('createMockFormSubmission should call all registered callbacks', () => {
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  onMessage(callback1);
  onMessage(callback2);
  createMockFormSubmission();
  expect(callback1).toHaveBeenCalled();
  expect(callback2).toHaveBeenCalled();
});


test('renders header text', () => {
  render(<App />);

  const heading  = screen.getByRole('heading', { name: /toast exercise/i});
  expect(heading).toBeInTheDocument();
});
