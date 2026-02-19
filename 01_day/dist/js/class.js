export class Contact {
    id;
    Fname;
    Lname;
    phone;
    constructor(Fname, Lname, phone) {
        this.id = Date.now();
        this.Fname = Fname;
        this.Lname = Lname;
        this.phone = phone;
    }
}
export class ContactService {
    conatct = [];
    showAll() {
        return this.conatct;
    }
    add(contact) {
        if (this.some(contact))
            return;
        this.conatct.push(contact);
    }
    some(conact) {
        const cFname = conact.Fname.toLowerCase();
        const cLname = conact.Lname.toLowerCase();
        const user = this.conatct.some((s) => s.Fname.toLowerCase() === cFname && s.Lname.toLowerCase() === cLname);
        const phone = this.conatct.some((s) => s.phone === conact.phone);
        return user || phone;
    }
    delete(id) {
        this.conatct = this.conatct.filter((c) => c.id !== id);
    }
    searchByName(value) {
        const val = value.toLowerCase().trim();
        const search = this.conatct.filter((s) => s.Fname.toLowerCase().includes(val) ||
            s.Lname.toLowerCase().includes(val));
        return search;
    }
}
