// function to generate markdown for README
function generateMarkdown({title, description, installation, usage, license, contribution, tests, username, email}) {
  return `# ${title}

  ![GitHub License](https://img.shields.io/github/license/${username}/${ title })![GitHub Repo Size](https://img.shields.io/github/repo-size/${username}/${title})

  ## Description:

  ${ description }
  
  [Link to Repo](https://github.com/${ username }/${ title })

  

  ## Table of Contents
    
 * [Installation](#Installation)

 * [Usage](#Usage)

 * [License](#License)
 
 * [Contributing](#Contributing)
 
 * [Tests](#Tests)
 
 * [Questions](#Questions)
 
  
  
  ## Installation
  
  ${ installation }
  
  
  
  ## Usage
  
  ${ usage }
  


  ## License
  
  ${ license }
  
  

  ## Contribution Guidelines
  
  ${ contribution }
  
  
  
  ## Tests
  
  ${ tests }
  
  
  
  ## Questions
  
  Please address questions to ${ username }.
  
  [Link to Profile](https://github.com/${ username })
  
  [E-mail](${ email })
  
  
  `;
}

module.exports = generateMarkdown;
