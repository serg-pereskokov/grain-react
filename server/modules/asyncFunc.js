const sql = (conn, query) => {
    return new Promise((resolve, reject) => {
        conn.query(query, (err, result) => {
            if(err){
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

export { sql }