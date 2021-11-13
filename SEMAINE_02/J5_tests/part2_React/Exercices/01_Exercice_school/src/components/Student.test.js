import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Student from "./Student";

let fakeStudent;

let container = null;
beforeEach(() => {
  // met en place un élément DOM comme cible de rendu
  container = document.createElement("div");
  document.body.appendChild(container);

   fakeStudent = {
    "id": 1,
    "name": "Alice",
    "lastname": "Al",
    "grade": "master 5",
    "notes": [
      18,
      16,
      8,
      11
    ]
  };

 

});

afterEach(() => {
  // nettoie en sortie de test
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Afficher les données d'un étudiant", () => {
  act(() => {
    render(<Student {...fakeStudent} handleDetail={() => handleDetail(fakeStudent.id)} detail={fakeStudent} />, container);
  });
  expect(container.querySelector(".user > p").textContent).toBe(`Prénom : ${fakeStudent.name} Nom : ${fakeStudent.lastname}`);
});


it("Details d'un étudiant grade et moyenne", () => {

  const handleDetail = jest.fn( (id) => fakeStudent );

  act(() => {
    render(<Student {...fakeStudent} handleDetail={() => handleDetail(fakeStudent.id)} detail={fakeStudent} />, container);
  });

  const student = container.querySelector(".user > p");

  act(() => {
    student.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const info = container.querySelectorAll('li') ;
  expect(info[0].textContent).toBe('Niveau : master 5');

  // calcul de la moyenne 
  const average = Math.round( 10 *  fakeStudent.notes.reduce((acc, curr) => acc + curr ) / fakeStudent.notes.length ) / 10 ;
  expect(info[1].textContent).toBe(`Moyenne : ${average}`);
});