const wordData = new Map<number, string[]>([
    [3, ["cat", "dog", "bat", "rat", "sun", "fan", "top", "zip", "box", "cup",
        "man", "van", "hat", "log", "fig", "net", "peg", "run", "bag", "bug",
        "bat", "hip", "ant", "gem", "jaw", "lit", "orb", "pit", "sip", "tip",
        "elk", "fig", "guy", "hut", "ivy", "jot", "kit", "lid", "mop", "nap"
    ]],
    [4, ["tree", "book", "fish", "door", "lamp", "wolf", "frog", "ship", "star", "moon",
        "time", "cake", "love", "fire", "wind", "rain", "snow", "line", "bear", "king",
        "hill", "bear", "frog", "gold", "milk", "blue", "sand", "rock", "path", "cold",
        "gaze", "wave", "mark", "kind", "yard", "wolf", "bell", "dust", "seed", "clip"
    ]],
    [5, ["apple", "grape", "bread", "chair", "table", "plane", "house", "light", "horse", "sweet",
        "river", "space", "dream", "truck", "smile", "stone", "plant", "glass", "frame", "sound",
        "flame", "clock", "shine", "drink", "heart", "toast", "grain", "beach", "drift", "grass",
        "brick", "chase", "cloud", "flock", "grape", "angle", "beast", "crisp", "flute", "grind",
        "hover", "jolly", "knife", "lunar", "maple", "ocean", "petal", "quake", "realm", "shark"
    ]],
    [6, ["bridge", "planet", "coffee", "animal", "bottle", "window", "forest", "rocket", "silver", "butter",
        "jungle", "pencil", "bright", "candle", "flower", "street", "hammer", "orange", "button", "garden",
        "guitar", "monkey", "pillow", "singer", "stripe", "vision", "winter", "prince", "stream", "castle"
    ]],
    [7, [
        "balloon", "captain", "harmony", "journey", "kingdom", "machine", "network", "octopus", "picture", "quieter",
        "sunrise", "teacher", "umbrella", "village", "whisper", "yellowy", "zombie", "fantasy", "history", "shelter"
    ]],
    [8, [
        "airplane", "backpack", "building", "campaign", "dolphins", "elephant", "firewood", "gardener", "horizon",
        "infinite", "jeweller", "keyboard", "landscape", "mountain", "notebook", "painting", "quarters", "reindeer",
        "sandwich", "treasure"
    ]],
    [9, [
        "adventure", "blueprint", "chocolate", "discovery", "equipment", "fantastic", "honeymoon", "landscape",
        "noteworthy", "publisher", "revolution", "sunflower", "trampoline", "waterfall", "workspace", "algorithm",
        "bootstrap", "crossroad", "dashboard", "ecosystem"
    ]]
])

export const getRandomWord = (length: number) => {
    const words: string[] = wordData.get(length) ?? []
    return words[Math.floor(Math.random() * words.length)].toUpperCase()
}