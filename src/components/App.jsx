import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  handleChangeFilter = event => {
    const value = event.target.value;
    this.setState({ filter: value });
  };

  handleAppProfile = formData => {
    const lowerCaseName = formData.name.toLowerCase();
    if (
      this.state.contacts.some(
        profile => profile.name.toLowerCase() === lowerCaseName
      )
    ) {
      alert(`Profile with this ${formData.name} already exists!`);
      return;
    }

    const finaleProfile = { ...formData, id: nanoid() };
    console.log(finaleProfile);

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, finaleProfile],
      };
    });
  };

  handleDeleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    });
  };
  componentDidMount() {
    const stringifedContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(stringifedContacts) ?? [];
    this.setState({ contacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const stringifedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifedContacts);
    }
  }

  render() {
    const filteredProfiles = this.state.contacts.filter(profile =>
      profile.name
        .toLowerCase()
        .includes(this.state.filter.trim().toLowerCase())
    );
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          handleAppProfile={this.handleAppProfile}
          onChange={this.handleChange}
        />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onChange={this.handleChangeFilter} />
        <ContactList
          contacts={(this.state.contacts, filteredProfiles)}
          onDelete={this.handleDeleteContact}
        />
      </div>
    );
  }
}
