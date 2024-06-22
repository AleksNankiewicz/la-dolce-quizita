import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">O Quizymani</h1>
      <p className="text-lg">
        Witamy na Quizymanii – stronie, która łączy pasję do wiedzy z radością
        odkrywania i rywalizacji. Quizymania to idealne miejsce dla wszystkich
        miłośników quizów, oferujące szeroki wybór quizów z różnych dziedzin
        wiedzy. Niezależnie od tego, czy interesujesz się historią, nauką,
        popkulturą czy sportem, z pewnością znajdziesz coś dla siebie.
      </p>
      <div className="">
        <h1 className="text-2xl font-bold">Cechy naszej stony</h1>
        <ul className="list flex list-disc flex-col gap-2 pl-8 pt-2 text-lg">
          <li>
            <b>Szeroki wybór quizów:</b> Zagraj w quizy z różnorodnych kategorii
            i sprawdź swoją wiedzę na wielu płaszczyznach.
          </li>
          <li>
            <b>Tworzenie kolekcji quizów:</b> Zbieraj swoje ulubione quizy w
            kolekcjach, aby łatwo do nich wracać i dzielić się nimi z innymi.
          </li>
          <li>
            <b>Intuicyjny edytor quizów:</b> Nasze narzędzie do tworzenia quizów
            jest łatwe w obłudze, a jednocześnie oferuje zaawansowane
            możliwości. Twórz quizy z różnymi rodzajmi pytań - od jednokrotnego
            wyboru, przez wielekrotny wybór, aż po pytania otwarte i sortowalne.
          </li>
          <li>
            <b>Profil użytkownika:</b> Stwórz swój własny profil, śledź swoje
            postępy, zapisuj ulubione quizy i kolekcje, oraz rywalizuj z innymi
            użytkownikami.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default page;
