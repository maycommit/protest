const getAttrName = (attr) => attr.split(':')[0]

const camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}


const createFormString = (name, attributes) => {
  return attributes.map(attr => `
    <div class="form-group">
      <label>${getAttrName(attr)}</label>
      <input type="text" name="${getAttrName(attr)}" class="form-control" value=<%= ${camelize(name)} && ${camelize(name)}.${getAttrName(attr)} %>>
    </div>
  `).join('')
}

const createListString = (name, attributes) => {
  return attributes.map(attr => `
    <td><%= ${camelize(name)}.${getAttrName(attr)} %></td>
  `).join('')
}

const createItemString = (name, attributes) => {
  return attributes.map(attr => `
    <li class="list-group-item">
      <strong>${getAttrName(attr)}</strong>
      <%= ${camelize(name)}.${getAttrName(attr)} %>
    </li>
  `).join('')
}

const render = (name, file, attributes) => {
  const formTemplate = createFormString(name, attributes)
  const listTemplate = createListString(name, attributes)
  const itemTemplate = createItemString(name, attributes)
  const formRender = file.replace('<!-- FORM HERE -->', formTemplate)
  const listRender = formRender.replace('<!-- LIST HERE -->', listTemplate)
  const itemRender = listRender.replace('<!-- ITEM HERE -->', itemTemplate)

  return itemRender
}


module.exports = (plop) => {
  plop.setWelcomeMessage('Welcome to Darwin CLI')
  plop.setGenerator('generate', {
    description: 'Generate',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Component name: ',
    }, {
      type: 'input',
      name: 'attributes',
      message: 'Attributes: ',
    }],
    actions: ({ name, attributes }) => [
      {
        type: 'add',
        path: `src/views/{{kebabCase name}}/edit.ejs`,
        templateFile: './generators/view/edit.ejs',
        transform: file => render(name, file, attributes.split(' '))
      },
      {
        type: 'add',
        path: `src/views/{{kebabCase name}}/form.ejs`,
        templateFile: './generators/view/form.ejs',
        transform: file => render(name, file, attributes.split(' '))
      },
      {
        type: 'add',
        path: `src/views/{{kebabCase name}}/index.ejs`,
        templateFile: './generators/view/index.ejs',
        transform: file => render(name, file, attributes.split(' '))
      },
      {
        type: 'add',
        path: `src/views/{{kebabCase name}}/new.ejs`,
        templateFile: './generators/view/new.ejs',
        transform: file => render(name, file, attributes.split(' '))
      },
      {
        type: 'add',
        path: `src/views/{{kebabCase name}}/show.ejs`,
        templateFile: './generators/view/show.ejs',
        transform: file => render(name, file, attributes.split(' '))
      },
      {
        type: 'add',
        path: `src/controllers/{{kebabCase name}}-controller.ts`,
        templateFile: './generators/controller.hbs',
      }
    ]
  })
}