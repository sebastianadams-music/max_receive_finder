function handleFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
      alert('No file selected');
      return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
      const jsonData = event.target.result;
      const data = JSON.parse(jsonData);

      const instances = findTextStartingWithR(data);
      displayResults(instances);
    };

    reader.readAsText(file, 'utf-8');
  }

  function findTextStartingWithR(data) {
    const results = [];

    function traverse(obj) {
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          traverse(obj[key]);
        } else if (key === 'text' && typeof obj[key] === 'string' && obj[key].startsWith('r ')) {
          results.push(obj[key]);
        }
        else if (key === 'text' && typeof obj[key] === 'string' && obj[key].startsWith('receive ')) {
            results.push(obj[key]);
          }
        else if (key === 'text' && typeof obj[key] === 'string' && obj[key].startsWith('receive~ ')) {
            results.push(obj[key]);
          }
        else if (key === 'text' && typeof obj[key] === 'string' && obj[key].startsWith('r~ ')) {
            results.push(obj[key]);
          }
      }
    }

    traverse(data);

    return results;
  } 

  function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
      resultsDiv.textContent = 'No results found';
    } else {
      const ul = document.createElement('ul');
      results.forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        ul.appendChild(li);
      });
      resultsDiv.appendChild(ul);
    }
  }
