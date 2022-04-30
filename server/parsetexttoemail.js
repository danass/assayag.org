
let emailrawdata =`* FLAGS (\Answered \Flagged \Deleted \Seen \Draft)
* OK [PERMANENTFLAGS (\Answered \Flagged \Deleted \Seen \Draft \*)] Flags permitted.
* 1 EXISTS
* 0 RECENT
* OK [UIDVALIDITY 1650764996] UIDs valid
* OK [UIDNEXT 2] Predicted next UID
tag OK [READ-WRITE] Select completed (0.001 + 0.000 secs).
* 1 FETCH (RFC822.SIZE 1706 BODY[HEADER.FIELDS (DATE FROM SUBJECT)] {109}
Date: Sun, 24 Apr 2022 03:51:30 +0200
From: Daniel Assayag <daniel@assayag.org>
Subject: hello mtdfcker

)
* 1 FETCH (RFC822.SIZE 1706 BODY[TEXT] {851}
This is a multi-part message in MIME format.
--------------R6NlCyt96URULlShZCJAvQCj
Content-Type: text/plain; charset=UTF-8; format=flowed
Content-Transfer-Encoding: 8bit
How are you?
Ok *bye*
https://www.perdu.com <https://www.perdu.com>
😁
--------------R6NlCyt96URULlShZCJAvQCj
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: 8bit
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  </head>
  <body>
    <p>How are you?</p>
    <p><br>
    </p>
    <p>Ok  <b>bye</b></p>
    <p><br>
    </p>
    <p><a moz-do-not-send="true" href="https://www.perdu.com"><font
          size="6">https://www.perdu.com</font></a></p>
    <p><br>
    </p>
    <p>😁</p>
    <p><br>
    </p>
  </body>
</html>

--------------R6NlCyt96URULlShZCJAvQCj--
)
tag OK Fetch completed (0.002 + 0.000 + 0.001 secs).
tag OK Fetch completed (0.001 + 0.000 secs).
` 

let email = 
{
    "headers": {
     
    }
  }

console.log(email)