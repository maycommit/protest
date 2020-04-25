const getAttrName = (attr) => attr.split(':')[0]

const camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

const toPascalCase = (string) => {
  return `${string}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w+)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\s/, 'g'), '')
    .replace(new RegExp(/\w/), s => s.toUpperCase());
}


const createFormString = (name, attributes) => {
  return attributes.map(attr => `
    <div class="form-group">
      <label>${toPascalCase(getAttrName(attr))}</label>
      <input type="text" name="${getAttrName(attr)}" class="form-control" value=<%= ${camelize(name)} && ${camelize(name)}.${getAttrName(attr)} %>>
    </div>
  `).join('')
}

const createTableColumnString = (name, attributes) => {
  return attributes.map(attr => `
    <td><%= ${camelize(name)}.${getAttrName(attr)} %></td>
  `).join('')
}

const createTableHeaderString = (name, attributes) => {
  return attributes.map(attr => `
    <th>${toPascalCase(getAttrName(attr))}</th>
  `).join('')
}

const createItemString = (name, attributes) => {
  return attributes.map(attr => `
    <li class="list-group-item">
      <strong>${toPascalCase(getAttrName(attr))}</strong>
      <%= ${camelize(name)}.${getAttrName(attr)} %>
    </li>
  `).join('')
}

const render = (name, file, attributes) => {
  const formTemplate = createFormString(name, attributes)
  const tableHeaderTemplate = createTableHeaderString(name, attributes)
  const tableColumnTemplate = createTableColumnString(name, attributes)
  const itemTemplate = createItemString(name, attributes)
  const formRender = file.replace('<!-- FORM HERE -->', formTemplate)
  const tableHeaderRender = formRender.replace('<!-- TABLE HEADER HERE -->', tableHeaderTemplate)
  const tableColumnRender = tableHeaderRender.replace('<!-- TABLE COLUMN HERE -->', tableColumnTemplate)
  const itemRender = tableColumnRender.replace('<!-- ITEM HERE -->', itemTemplate)

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
        transform: file => render(name, file, attributes.split(' ')),
        force: true
      },
      {
        type: 'add',
        path: `src/views/{{kebabCase name}}/form.ejs`,
        templateFile: './generators/view/form.ejs',
        transform: file => render(name, file, attributes.split(' ')),
        force: true
      },
      {
        type: 'add',
        path: `src/views/{{kebabCase name}}/index.ejs`,
        templateFile: './generators/view/index.ejs',
        transform: file => render(name, file, attributes.split(' ')),
        force: true
      },
      {
        type: 'add',
        path: `src/views/{{kebabCase name}}/new.ejs`,
        templateFile: './generators/view/new.ejs',
        transform: file => render(name, file, attributes.split(' ')),
        force: true
      },
      {
        type: 'add',
        path: `src/views/{{kebabCase name}}/show.ejs`,
        templateFile: './generators/view/show.ejs',
        transform: file => render(name, file, attributes.split(' ')),
        force: true
      },
      {
        type: 'add',
        path: `src/controllers/{{kebabCase name}}-controller.ts`,
        templateFile: './generators/controller.hbs',
        force: true
      }
    ]
  })
}