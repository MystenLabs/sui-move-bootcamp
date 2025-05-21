module my_event_emitter::my_event_emitter;

use age_calculator::age_calculator::calculate_age;
use names_indexer::names_indexer::NameIndexer;
use std::string::String;
use sui::clock::Clock;
use sui::event;
use weather_oracle::weather_oracle::get_weather;

public struct GreetingEvent has copy, drop {
    greeting: String,
}

public fun emit_greeting_event(
    clock: &Clock,
    name_indexer: &NameIndexer,
    name: vector<u8>,
    birth_date: u64,
) {
    let age = calculate_age(clock, birth_date);
    let name = name_indexer.borrow_name(name);
    let weather = get_weather(clock);

    let mut greeting = b"Hello World! Have a nice ".to_string();
    greeting.append(weather);
    greeting.append(b" day! My name is ".to_string());
    greeting.append(name);
    greeting.append(b" and I am ".to_string());
    greeting.append(age.to_string());
    greeting.append(b" years old.".to_string());

    let event = GreetingEvent { greeting };
    event::emit(event);
}

// TODO: Add a greeting method that does not contain the weather

public fun emit_greeting_event_no_weather(
    clock: &Clock,
    name_indexer: &NameIndexer,
    name: vector<u8>,
    birth_date: u64,
) {
    let age = calculate_age(clock, birth_date);
    let name = name_indexer.borrow_name(name);

    let mut greeting = b"Hello World! Have a nice ".to_string();
    greeting.append(b" day! My name is ".to_string());
    greeting.append(name);
    greeting.append(b" and I am ".to_string());
    greeting.append(age.to_string());
    greeting.append(b" years old.".to_string());

    let event = GreetingEvent { greeting };
    event::emit(event);
}