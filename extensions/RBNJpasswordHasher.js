// ID: RBNJpasswordHasher
// Name: Password Hasher
// Description: Hash a string or password as many times as you want using SHA-521, including using a salt.
// By: RobotNinjaJesse <https://scratch.mit.edu/users/RobotNinjaJesse/>
// Banner: https://raw.githubusercontent.com/robotninjajesse/RBNJ-extensions/main/banners/RBNJpasswordHasher.png
// License: MIT

(function (Scratch) {
    'use strict';

    class CustomExtension {
        getInfo() {
            return {
                id: 'customExtension',
                name: 'Password Hasher',
                color1: '#333333',
                menuIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAArCAYAAADsQwGHAAAABmJLR0QA/wD/AP+gvaeTAAADSElEQVRYhc2ZX2iOURzHv2fMv92YFuZPMvlbciG5ECmxhcT8Sblc0XKhWUqMCyFuiEmSUmIjXCpLy8Va/qy0JgkXSv7MMn8yKw0fF++jtuf9vc953nnfZ/vd7TzP53w/79l5zvue80g5LKAYOAXcBfYCI2Jy+4FPwAegOpdOccLvMbAOx2AqQswfYEkSvgLmkV4dMbhGg4sc7YLcaWur0fY+CgDGSlpvXHqaEyNfAR3GiO30MJUG8wHI5WBmDJ9jhP8CJnq4BoM7m3fhILzOCG/2MGOAbwa3IinpdiM88mECNmaYGrGWyf8Vnm2E/wZKPdxVgzuXd+Eg/IARft/DjAa+GtzKpKSfGOG7PcwGg+lMamqUZZgaUzzcFYM7HzfXZei0XNI+SeM9/GRJU0NtPZJeeDIXSQqP6ktJ3yO4XkkXnHMNadLAAkntkgo9wkNRSCq3vnnWaHgKS6n/0jpL+lXSJllWuh/ggPrggRpudRMYZT6IgXyxpOIMl0sltWjgg4ykFYr+ZXdS0pZQ23VJByOYf9XjnOuKcZ9dQK0xCq0ephDoNrg1gxbJUvqhEV7jYcoN5jMwKgnhaaS2RP3rDzDDw10ypC/lXTgIrzHCH3iYkUCXwVUkJd1qhNd6mNUG8yWpqTEVeyks83AXDeZy3oWD8D1G+CMPMwL4aHBrk5JuMcL3eZhVuZ4aI4OOp0naLqkk4t4iScuM9lnAiQjOWoffSjoCRLm9ldTonOsOX3DBfGyTNCGqhyGq15IWO+e+9G8skFSl4SksSTOV/rWvAkm/k3fJqtL8HDBd0mOldiHDrZ5LWuqcG7CjcZIElEiqVOZfdTslhdfiJklRu+6ygOtfPyUdldQXQ7hT0m3nXE+MewcWMInUEVe45nq4eoO5lrXAYAqoNsLbPUwB8M7gNiUl3WyE13mY5QbzndTRbt6FS4A+Q2C+hztjMI15Fw7Cdxnhkaf7pPaYbwxuc1LS4Xco4HmPAiwzmB9AURLCmabGAg932mBu5F04CK8ywp/F4F4b3LZcukW921hotN2K0Wf4XLpX0p3YRjEqSrot9PcvSVdj9Bn+YJedcz+yshpskVoFjpM6/H4D7IjJjQOOAU3AIWB0rt3+Aiz+Ji+skOWgAAAAAElFTkSuQmCC',
                blocks: [
                    {
                        opcode: 'hashPassword',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'hash password [PASSWORD] using salt [SALT] with [ITERATIONS] iterations',
                        arguments: {
                            PASSWORD: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'mypassword'
                            },
                            SALT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'mysalt'
                            },
                            ITERATIONS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 999999
                            }
                        }
                    }
                ]
            };
        }

        async hashPassword(args) {
            const password = args.PASSWORD;
            const salt = args.SALT;
            const iterations = parseInt(args.ITERATIONS, 10);

            const enc = new TextEncoder();
            const passwordKey = enc.encode(password);
            const saltKey = enc.encode(salt);

            const key = await crypto.subtle.importKey(
                'raw',
                passwordKey,
                { name: 'PBKDF2' },
                false,
                ['deriveBits']
            );

            const derivedBits = await crypto.subtle.deriveBits(
                {
                    name: 'PBKDF2',
                    salt: saltKey,
                    iterations: iterations,
                    hash: 'SHA-512'
                },
                key,
                512
            );

            const hashArray = Array.from(new Uint8Array(derivedBits));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            return hashHex;
        }
    }

    Scratch.extensions.register(new CustomExtension());
})(Scratch);
