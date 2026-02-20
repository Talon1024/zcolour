#![no_std]

pub fn z_colour(r: u8, g: u8, b: u8, a: u8) -> u32 {
    // See uzdoom/src/common/utility/palentry.h
    u32::from_le_bytes([a, r, g, b])
}
