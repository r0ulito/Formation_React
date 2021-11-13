import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Message from './components/Message';
import Student from './components/Student';

import App from "./App";

fetch = jest.fn(() => Promise.resolve());

let container = null;
beforeEach(() => {
  // Créer une cible
  container = document.createElement("div");
  document.body.appendChild(container);
  fetch.mockClear();
});

afterEach(() => {
  // Nettoyez le DOM en retirant l'arbre monté
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Messages", () => {
  const fakeMessage = [
    {
      type: "warning",
      content: "Hello message Warning"
    },
    {
      type: "danger",
      content: "Hello message Danger"
    },
  ];
  act(() => {
    render(<Message {...fakeMessage[0]} />, container);
  });
  expect(container.textContent).toBe("Hello message Warning");

  act(() => {
    render(<Message {...fakeMessage[1]} />, container);
  });
  expect(container.textContent).toBe("Hello message Danger");;
});


it("Click and change message", async () => {

  const fakeStudents = {
    students: [{
      id: 1,
      name: "Alan",
      lastname: "Al",
      notes: [],
      grade: "master 5"
    }]
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeStudents)
    })
  );

  await act(async () => {
    render(<App />, container);
  });

  const button = container.querySelector(".btn-change");
  expect(button.innerHTML).toBe("Change message");

  const messageDefault = container.querySelector('.warning');

  expect(messageDefault.textContent).toBe("Hello message Warning");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const messageDanger = container.querySelector('.danger');
  expect(messageDanger.textContent).toBe("Hello message Danger");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const messageWarning = container.querySelector('.warning');
  expect(messageWarning.textContent).toBe("Hello message Warning");

  global.fetch.mockRestore();

});

it("Etudiand présent dans le DOM", async () => {
  const fakeStudents = {
    students: [{
      id: 1,
      name: "Alan",
      lastname: "Al",
      notes: [11, 10],
      grade: "master 5"
    }]
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeStudents)
    })
  );

  await act(async () => {
    render(<App />, container);
  });

  const students = container.querySelector('h2');
  expect(students.textContent).toBe("Liste des étudiants 1");
});