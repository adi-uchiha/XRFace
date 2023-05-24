function handleFoundFaces(foundFaces) {

  function fetchDataForFiles(foundFaces) {
    const fetchPromises = foundFaces.map(foundFace => {
      const url = `http://localhost:3000/getUser/${foundFace}`;
      return fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error: ' + response.status);
          }
          return response.json();
        })
        .then(data => {
          console.log(`Data for ${foundFace}:`, data);
          return data; // Return the fetched data if needed
        })
        .catch(error => {
          console.error(`Error fetching data for ${foundFace}:`, error.message);
          // Handle any errors that occurred during the request
        });
    });
  
    return Promise.all(fetchPromises);
  }
  
  // Usage example:

  fetchDataForFiles(foundFaces)
    .then(dataArray => {
      console.log('All data fetched:', dataArray);
      // Handle the fetched data for all files
    })
    .catch(error => {
      console.error('Error:', error.message);
      // Handle any errors that occurred during the fetch
    });
  
}

function handleFoundFaces(foundFaces) {

  function fetchDataForFiles(foundFaces) {
    const fetchPromises = foundFaces.map(foundFace => {
      const url = `http://localhost:3000/getUser/${foundFace}`;
      return fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error: ' + response.status);
          }
          return response.json();
        })
        .then(data => {
          console.log(`Data for ${foundFace}:`, data);
          return data; // Return the fetched data if needed
        })
        .catch(error => {
          console.error(`Error fetching data for ${foundFace}:`, error.message);
          // Handle any errors that occurred during the request
        });
    });
  
    return Promise.all(fetchPromises);
  }
  
  // Usage example:

  fetchDataForFiles(foundFaces)
    .then(dataArray => {
      console.log('All data fetched:', dataArray);
      // Handle the fetched data for all files
    })
    .catch(error => {
      console.error('Error:', error.message);
      // Handle any errors that occurred during the fetch
    });
  
}