<TextInput
style={styles.commentInput}
placeholder="Your name"
value={loggedInUser}
onChangeText={text => setLoggedInUser(text)}
/>
              <Text style={styles.commentText1}>{comment.loggedInUser}</Text>
              const [loggedInUser, setLoggedInUser] = useState('');