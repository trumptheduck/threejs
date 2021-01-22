//This is alternatives to Scene Loader
/*
				const geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
				// invert the geometry on the x-axis so that all of the faces point inward
				geometry.scale( - 1, 1, 1 );

				const material = new THREE.MeshBasicMaterial( {
					map: new THREE.TextureLoader().load( 'images/image.jpg' )
				} );

				const mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );

				const helperGeometry = new THREE.BoxBufferGeometry( 100, 100, 100, 4, 4, 4 );
				const helperMaterial = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true } );
				const helper = new THREE.Mesh( helperGeometry, helperMaterial );
                */
				//
                /*const geometry = new THREE.BoxGeometry();
                const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
                const cube = new THREE.Mesh( geometry, material );
                const planeGeometry = new THREE.BoxGeometry(100,1,100)
                const planeMaterial = new THREE.MeshStandardMaterial({color: 0x11221 })
                const planeMesh = new THREE.Mesh(planeGeometry,planeMaterial)
                scene.add( planeMesh )
                planeMesh.position.y = -1
                scene.add( cube );
                const light = new THREE.AmbientLight( 0x404040 ); // soft white light
                scene.add( light );*/