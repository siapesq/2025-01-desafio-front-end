'use client';

import React from 'react';

export default function ViewSpecie() {
    const specieId = localStorage.getItem('specieId');
    console.log("Id:", specieId);

    return (
        <h1>Visualizar espécie</h1>
    );
}
