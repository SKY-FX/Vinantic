export const onGetBottles = async () => {
  await fetch("/vinanticApi/getBottles")
    .then((res) => res.json())
    .then((data) => {
      console.info('onGetBottles', data);
      return data;
    });
};

export const onCreateBottle = async () => {
  await fetch("/vinanticApi/createBottle", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: {
      name: 'Château Pétrus',
      price: '3350',
      year: '2000',
      quality: 'Très bonne',
      image: '',
    }}),
  })
    .then((res) => res.json())
    .then((data) => {
      console.info('onCreateBottle', data)
    });
};

export const onSetBottles = async (bottles) => {
  await fetch("/vinanticApi/setBottles", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: bottles}),
  })
    .then((res) => res.json())
    .then((data) => {
      console.info('onSetBottles', data)
    })
};

export const onDeleteBottles = async () => {
  await fetch("/vinanticApi/deleteBottles", {
    method: 'DELETE'
  })
    .then((res) => res.json())
    .then((data) => {
      console.info('onDeleteBottles', data)
    });
}