## User
- [Array of List, OneToMany, JoinColumn] lists
## Entry
- [List, ManyToOne] List
## List
- [Unique for User, String] Name
- [Boolean, Not Null] Private
- [User, ManyToOne] User 
- User can have multiple Lists, List has one User
- [Array of Entry, OneToMany, JoinColumn] Entries
- List can have multiple entries, Entry has one List
### Create List
### Update List
### Remove List
- Cascade remove Entries