import React from 'react';
export function Pretty({data}) {
    return <div><pre>{JSON.stringify(data, null, 2) }</pre></div>;

}