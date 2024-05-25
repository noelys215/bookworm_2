package com.example.bookworm.backend.config;

import com.example.bookworm.backend.model.Book;
import com.example.bookworm.backend.model.Role;
import com.example.bookworm.backend.model.User;
import com.example.bookworm.backend.repository.BookRepository;
import com.example.bookworm.backend.repository.RoleRepository;
import com.example.bookworm.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        /* Overwrite existing data */
        userRepository.deleteAll();
        roleRepository.deleteAll();
        bookRepository.deleteAll();

        /* Create roles */
        Role adminRole = new Role();
        adminRole.setName("ROLE_ADMIN");
        Role userRole = new Role();
        userRole.setName("ROLE_USER");
        roleRepository.saveAll(List.of(adminRole, userRole));

        /* Create users */
        User admin = new User("Admin", "admin@example.com", passwordEncoder.encode("admin123"));
        admin.setRoles(new HashSet<>(Set.of(adminRole, userRole)));

        User regularUser = new User("User", "user@example.com", passwordEncoder.encode("user123"));
        regularUser.setRoles(new HashSet<>(Set.of(userRole)));

        userRepository.saveAll(List.of(admin, regularUser));

        /* Create books */
        List<Book> books = List.of(
                new Book("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565", 10, 0, 1925, "Fiction", LocalDateTime.now(), LocalDateTime.now()),
                new Book("To Kill a Mockingbird", "Harper Lee", "9780061120084", 10, 0, 1960, "Fiction", LocalDateTime.now(), LocalDateTime.now()),
                new Book("1984", "George Orwell", "9780451524935", 10, 0, 1949, "Dystopian", LocalDateTime.now(), LocalDateTime.now()),
                new Book("Moby Dick", "Herman Melville", "9781503280786", 10, 0, 1851, "Adventure", LocalDateTime.now(), LocalDateTime.now()),
                new Book("Pride and Prejudice", "Jane Austen", "9781503290563", 10, 0, 1813, "Romance", LocalDateTime.now(), LocalDateTime.now()),
                new Book("War and Peace", "Leo Tolstoy", "9781853260629", 10, 0, 1869, "Historical", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Catcher in the Rye", "J.D. Salinger", "9780316769488", 10, 0, 1951, "Fiction", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Hobbit", "J.R.R. Tolkien", "9780547928227", 10, 0, 1937, "Fantasy", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Alchemist", "Paulo Coelho", "9780061122415", 10, 0, 1988, "Fiction", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Grapes of Wrath", "John Steinbeck", "9780143039433", 10, 0, 1939, "Fiction", LocalDateTime.now(), LocalDateTime.now()),
                new Book("Crime and Punishment", "Fyodor Dostoevsky", "9780486415871", 10, 0, 1866, "Psychological", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Brothers Karamazov", "Fyodor Dostoevsky", "9780374528379", 10, 0, 1880, "Philosophical", LocalDateTime.now(), LocalDateTime.now()),
                new Book("Brave New World", "Aldous Huxley", "9780060850524", 10, 0, 1932, "Dystopian", LocalDateTime.now(), LocalDateTime.now()),
                new Book("Jane Eyre", "Charlotte Brontë", "9780141441146", 10, 0, 1847, "Romance", LocalDateTime.now(), LocalDateTime.now()),
                new Book("Wuthering Heights", "Emily Brontë", "9780141439556", 10, 0, 1847, "Gothic", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Picture of Dorian Gray", "Oscar Wilde", "9780141439570", 10, 0, 1890, "Philosophical", LocalDateTime.now(), LocalDateTime.now()),
                new Book("Dracula", "Bram Stoker", "9780486411095", 10, 0, 1897, "Horror", LocalDateTime.now(), LocalDateTime.now()),
                new Book("Frankenstein", "Mary Shelley", "9780486282114", 10, 0, 1818, "Science Fiction", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Odyssey", "Homer", "9780140268867", 10, 0, -800, "Epic", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Iliad", "Homer", "9780140275360", 10, 0, -750, "Epic", LocalDateTime.now(), LocalDateTime.now()),
                new Book("A Tale of Two Cities", "Charles Dickens", "9780486406510", 10, 0, 1859, "Historical", LocalDateTime.now(), LocalDateTime.now()),
                new Book("Les Misérables", "Victor Hugo", "9780486457895", 10, 0, 1862, "Historical", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Count of Monte Cristo", "Alexandre Dumas", "9780140449266", 10, 0, 1844, "Adventure", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Secret Garden", "Frances Hodgson Burnett", "9780486423599", 10, 0, 1911, "Children's Literature", LocalDateTime.now(), LocalDateTime.now()),
                new Book("Little Women", "Louisa May Alcott", "9780147514011", 10, 0, 1868, "Fiction", LocalDateTime.now(), LocalDateTime.now()),
                new Book("Anna Karenina", "Leo Tolstoy", "9780140449174", 10, 0, 1877, "Romance", LocalDateTime.now(), LocalDateTime.now()),
                new Book("Gone with the Wind", "Margaret Mitchell", "9781451635621", 10, 0, 1936, "Historical", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Scarlet Letter", "Nathaniel Hawthorne", "9780486280482", 10, 0, 1850, "Fiction", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Adventures of Sherlock Holmes", "Arthur Conan Doyle", "9780486474911", 10, 0, 1892, "Mystery", LocalDateTime.now(), LocalDateTime.now()),
                new Book("Treasure Island", "Robert Louis Stevenson", "9780486275594", 10, 0, 1883, "Adventure", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Road", "Cormac McCarthy", "9780307387899", 10, 0, 2006, "Dystopian", LocalDateTime.now(), LocalDateTime.now()),
                new Book("Life of Pi", "Yann Martel", "9780156027328", 10, 0, 2001, "Adventure", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Girl with the Dragon Tattoo", "Stieg Larsson", "9780307454546", 10, 0, 2005, "Mystery", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Hunger Games", "Suzanne Collins", "9780439023528", 10, 0, 2008, "Dystopian", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Book Thief", "Markus Zusak", "9780375842207", 10, 0, 2005, "Historical Fiction", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Fault in Our Stars", "John Green", "9780142424179", 10, 0, 2012, "Romance", LocalDateTime.now(), LocalDateTime.now()),
                new Book("Gone Girl", "Gillian Flynn", "9780307588371", 10, 0, 2012, "Thriller", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Kite Runner", "Khaled Hosseini", "9781594631931", 10, 0, 2003, "Drama", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Da Vinci Code", "Dan Brown", "9780307474279", 10, 0, 2003, "Thriller", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Help", "Kathryn Stockett", "9780425232200", 10, 0, 2009, "Historical Fiction", LocalDateTime.now(), LocalDateTime.now()),
                new Book("Big Little Lies", "Liane Moriarty", "9780399167065", 10, 0, 2014, "Mystery", LocalDateTime.now(), LocalDateTime.now()),
                new Book("A Game of Thrones", "George R.R. Martin", "9780553573404", 10, 0, 1996, "Fantasy", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Goldfinch", "Donna Tartt", "9780316055437", 10, 0, 2013, "Fiction", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Night Circus", "Erin Morgenstern", "9780307744432", 10, 0, 2011, "Fantasy", LocalDateTime.now(), LocalDateTime.now()),
                new Book("The Martian", "Andy Weir", "9780553418026", 10, 0, 2011, "Science Fiction", LocalDateTime.now(), LocalDateTime.now())



        );

        bookRepository.saveAll(books);
    }
}
